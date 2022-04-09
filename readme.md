go mod init "nameproject"
go get github.com/...
go run main.go || go run .
go mod download
go build main.go || go build .