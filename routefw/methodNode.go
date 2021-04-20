package routefw

type methodNode struct {
	method string
	root *node
}

type methodNodes []methodNode

func (trees methodNodes) get(method string) *node{
	for _, t := range trees{
		if t.method == method{
			return t.root
		}
	}
	return nil
}