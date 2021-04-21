package routefw

import (
	"net/url"
	"strings"
)

const (
	static nodeType = iota // default
	root
	param
	catchAll
)

type node struct{
	path      string
	indices   string
	children  []*node
	handler HandlerFunc
	priority  uint32
	nType     nodeType
	maxParams uint8
	wildChild bool
	fullPath  string
}

type nodeType uint8



type nodeValue struct {
	handler HandlerFunc
	params   Params
	//tsr      bool
	fullPath string
}

func (n *node) getValue(path string, pa Params, unescape bool)(value nodeValue){
	value.params = pa
walk:
	for{
		prefix := n.path
		//handle without param
		if path == prefix{
			if value.handler = n.handler; value.handler != nil{
				value.fullPath = n.fullPath
				return
			}
		}
		//handle with param
		if len(path) > len(prefix) && path[:len(prefix)] == prefix{
			path = path[len(prefix):]
			if !n.wildChild{
				c := path[0]
				indices := n.indices
				for i:=0; i < len(indices);i++{
					if c == indices[i]{
						n = n.children[i]
						continue walk
					}
				}
				return
			}
			n = n.children[0]
			switch n.nType {
			case param:
				end := 0
				for end < len(path) && path[end] != '/' {
					end++
				}
				if cap(value.params) < int(n.maxParams) {
					value.params = make(Params,0, n.maxParams)
				}
				i := len(value.params)
				value.params = value.params[:i+1]
				value.params[i].Key = n.path[1:]
				val := path[:end]
				if unescape{
					var err error
					if value.params[i].Value, err = url.QueryUnescape(val); err != nil{
						value.params[i].Value = val
					}
				}else{
					value.params[i].Value = val
				}

				if end < len(path){
					if len(n.children) > 0{
						path = path[end:]
						n = n.children[0]
						continue walk
					}
				}

				if value.handler = n.handler; value.handler != nil{
					value.fullPath = n.fullPath
					return
				}
			case catchAll:
				if cap(value.params) < int(n.maxParams){
					value.params = make(Params, 0, n.maxParams)
				}
				i := len(value.params)
				value.params = value.params[:i+1]
				value.params[i].Key = n.path[2:]
				if unescape{
					var err error
					if value.params[i].Value, err = url.QueryUnescape(path); err != nil{
						value.params[i].Value = path
					}else {
						value.params[i].Value = path
					}
					value.handler = n.handler
					value.fullPath = n.fullPath
					return
				}
			default:
				panic("invalid node type")
			}

		}
		return
	}
}

func (n *node) insertChild(numParams uint8, path string, fullPath string, handler HandlerFunc){
	for numParams > 0 {
		wildcard, i, valid := findWildcard(path)
		if i < 0{
			break
		}

		if !valid || len(wildcard) < 2{
			panic("path " + path + " error")
		}
		// example /web/:abc and /web/:def
		if len(n.children) > 0{
			panic(wildcard + " conflic with exist children in " + fullPath)
		}
		//handle param
		if wildcard[0] == ':' {
			if i > 0{
				n.path = path[:i]
				path = path[i:]
			}

			n.wildChild = true
			child := &node{
				nType:		param,
				path:		wildcard,
				maxParams: 	numParams,
				fullPath: 	fullPath,
			}
			n.children = []*node{child}
			n = child
			n.priority++
			numParams--

			if len(wildcard) < len(path){
				path = path[len(wildcard):]
				child := &node{
					maxParams: numParams,
					priority: 1,
					fullPath: fullPath,
				}
				n.children = []*node{child}
				n = child
				continue
			}
			n.handler = handler
		}

		i--
		n.path = path[:i]
		child := &node{
			wildChild: true,
			nType: catchAll,
			maxParams: 1,
			fullPath: fullPath,
		}

		if n.maxParams < 1{
			n.maxParams = 1
		}

		n.children = []*node{child}
		n.indices = string('/')
		n = child
		n.priority++
		child = &node{
			path: path[i:],
			nType: catchAll,
			maxParams: 1,
			handler: handler,
			priority: 1,
			fullPath: fullPath,
		}
		n.children = []*node{child}
		return
	}

	//no param
	n.path = path
	n.handler = handler
	n.fullPath = fullPath
}

func (n *node) incrementChildPrio(pos int) int {
	cs := n.children
	cs[pos].priority++
	prio := cs[pos].priority

	newPos := pos

	for ;newPos > 0 && cs[newPos-1].priority < prio; newPos--{
		cs[newPos-1], cs[newPos] = cs[newPos], cs[newPos-1]
	}

	if newPos != pos{
		n.indices = n.indices[:newPos] +
			n.indices[pos:pos+1] +
			n.indices[newPos:pos] + n.indices[pos+1:]
	}
	return newPos
}

func (n *node) addRoute(path string, handler HandlerFunc){
	fullPath := path
	numParams := countParams(path)
	n.priority++
	//empty tree
	if len(n.path) == 0 && len(n.children) == 0{
		n.insertChild(numParams, path, fullPath, handler)
		n.nType = root
		return
	}
	parentFullPathIndex := 0

walk:
	for{
		if numParams > n.maxParams{
			n.maxParams = numParams
		}
		i := longestCommonPrefix(path, n.path)

		if i < len(n.path){
			child := node{
				path: n.path[i:],
				wildChild: n.wildChild,
				indices: n.indices,
				children: n.children,
				handler: n.handler,
				priority: n.priority-1,
				fullPath: n.fullPath,
			}

			for _, v := range child.children{
				if v.maxParams > child.maxParams{
					child.maxParams = v.maxParams
				}
			}
			n.children = []*node{&child}
			n.indices = string([]byte{n.path[i]})
			n.path = path[:i]
			n.handler = nil
			n.wildChild = false
			n.fullPath = fullPath[:parentFullPathIndex+i]
		}

		if i < len(path){
			path = path[i:]
			if n.wildChild{
				parentFullPathIndex += len(n.path)
				n = n.children[0]
				n.priority++

				if numParams > n.maxParams{
					n.maxParams = numParams
				}
				numParams--

				if len(path) >= len(n.path) && n.path == path[:len(n.path)]{
					if len(n.path) >= len(path) && path[len(n.path)] == '/'{
						continue walk
					}
				}

				pathSeg := path
				if n.nType != catchAll{
					pathSeg = strings.SplitN(path, "/", 2)[0]
				}
				prefix := fullPath[:strings.Index(fullPath, pathSeg)] + n.path
				panic("'" + pathSeg +
					"' in new path '" + fullPath +
					"' conflicts with existing wildcard '" + n.path +
					"' in existing prefix '" + prefix +
					"'")
			}
			c := path[0]
			if n.nType == param && c == '/' && len(n.children) == 1{
				parentFullPathIndex += len(n.path)
				n = n.children[0]
				n.priority++
				continue walk
			}
			for i:= 0; i < len(n.indices); i++{
				if c == n.indices[i]{
					parentFullPathIndex += len(n.path)
					i = n.incrementChildPrio(i)
					n = n.children[i]
					continue walk
				}
			}

			if c!= ':'{
				n.indices += string([]byte{c})
				child := &node{
					maxParams: numParams,
					fullPath: fullPath,
				}
				n.children = append(n.children, child)
				n.incrementChildPrio(len(n.indices) - 1)
				n = child
			}

			n.insertChild(numParams, path, fullPath, handler)
			return
		}

		if n.handler != nil{
			panic("handlers are already registered for path '" + fullPath + "'")
		}
		n.handler = handler
		return
	}
}

