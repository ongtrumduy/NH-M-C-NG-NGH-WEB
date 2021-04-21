package routefw

import (
	"net/http"
	"path"
)

func joinPaths(absolutePath, relativePath string) string {
	if relativePath == "" {
		return absolutePath
	}

	finalPath := path.Join(absolutePath, relativePath)
	appendSlash := lastChar(relativePath) == '/' && lastChar(finalPath) != '/'
	if appendSlash {
		return finalPath + "/"
	}
	return finalPath
}

func lastChar(str string) uint8 {
	if str == "" {
		panic("The length of the string can't be 0")
	}
	return str[len(str)-1]
}

func countParams(path string) uint8{
	var n int
	for i:=0; i < len(path); i++{
		if path[i] == ':'{
			n++
		}

	}
	if n >= 255 {
		panic("too many param")
	}
	return uint8(n)
}

func findWildcard(path string) (wildcard string, i int, valid bool){
	for start, c := range []byte(path){
		if c != ':' {
			continue
		}

		valid = true
		for end, c := range []byte(path[start+1:]){
			switch c {
			case '/':
				return path[start: start+1+end], start, valid
			case ':':
				valid = false
			}
		}
		return path[start:], start, valid
	}
	return "", -1, false
}



func longestCommonPrefix(a, b string) int{
	i := 0
	max := 0
	if len(a) <= len(b){
		max = len(a)
	}else{
		max = len(b)
	}
	for i < max && a[i] == b[i]{
		i++
	}
	return i
}

func bodyAllowedForStatus(status int) bool{
	switch {
	case status >= 100 && status <= 199:
		return false
	case status == http.StatusNoContent:
		return false
	case status == http.StatusNotModified:
		return false
	}
	return true
}