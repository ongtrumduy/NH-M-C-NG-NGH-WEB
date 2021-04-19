package routefw

import (
	"net/url"
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
	//priority  uint32
	nType     nodeType
	maxParams uint8
	wildChild bool
	fullPath  string
}

type nodeType uint8

type methodNode struct {
	method string
	root *node
}

type methodNodes []methodNode

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