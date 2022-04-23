package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-pg/pg/v10"
)

type Note struct {
	tableName struct{} `pg:"notes"`
	Id        int64    `json:"id" pg:"id,pk"`
	CreatedAt string   `json:"created_at", pg:"cratead_at"`
	Title     string   `json:"title", pg:"title"`
	Info      string   `json:"info", pg:"info"`
}

func pgDataBase() (con *pg.DB) {
	address := fmt.Sprintf("%s:%s", "localhost", "5432")
	options := &pg.Options{
		User:     "postgress",
		Password: "",
		Addr:     address,
		Database: "notice",
		PoolSize: 50,
	}

	con = pg.Connect(options)
	if con == nil {
		log.Fatalf("АШИБКА ПАДКЛЮЧЕНИЯ К 415 БАЗЕ. 415 БАЗА ОТВЕТЬТЕ")
	}
	return
}

func SelectNotes() []Note {
	var notes []Note
	db := pgDataBase()

	err := db.Model(&notes).Select()

	if err != nil {
		panic(err)
	}

	db.Close()

	return notes
}

func Api(c *gin.Context) {
	c.JSON(200, gin.H{
		"api": "notice",
	})
}

func GetNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, SelectNotes())
}

func main() {
	r := gin.Default()
	r.GET("/api", Api)

	rApi := r.Group("/api")
	{
		rApi.GET("/notes", GetNotes)
	}

	r.Run("0.0.0.0:9090")
}
