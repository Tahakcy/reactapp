'use strict';
const http = require ("http");
const uuid = require("uuid");
const fs =  require("fs");
const url = require("url");
const path = require("path");
const PORT = 5000;
const filePath = path.join(__dirname, 'todoList.txt');

const server = http.createServer((req, res) => {
    
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");  

        if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
        }

    const urlParts = req.url.split('/');
    const pathName = urlParts[1];
    const urlID = urlParts[2];
    
    if(req.method === 'GET' && req.url === '/'){
        res.write("Welcome to home page!");
        res.end();
    }

    if (req.method === 'GET' && pathName === 'todoList') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write("File read error.");
                res.end();
                return;
            }

            const todos = data
                .split('\n')
                .filter(line => line)
                .map(line => JSON.parse(line));

            if (urlID) {
                const todo = todos.find(todo => todo.id === urlID);
                if (!todo) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Todo item not found');
                    res.end();
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(todo));
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(todos));
                res.end();
            }
        });
    }

    if(req.method === 'POST' && req.url === '/todoList'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try{
                const parsedData = JSON.parse(body);
                const task = parsedData.task;
                const completed = parsedData.completed;
                
                if(!task){
                    res.writeHead(400, {'Content-Type' : 'text/plain'});
                    res.write('Todo task required!');
                    res.end();
                    return;
                }

                const newTask = {
                    id: uuid.v4(),
                    task: task,
                    completed: completed
                };

                fs.appendFile(filePath, JSON.stringify(newTask)+'\n',(err) => {
                    if(err) {
                        res.writeHead(500, {'Content-Type' : 'text/plain'});
                        res.write('File write error!');
                        res.end(); 
                        return;
                    }
                    res.writeHead(201, {'Content-Type' : 'text/plain'});
                    res.write('New task added successfully!');
                    res.end();
                });
            }catch(error){
                res.writeHead(400, {'Content-Type' : 'text/plain'});
                res.write('Parsing error!');
                res.end();
                return;
            }
        });
    }

    if(req.method === 'PUT' && pathName === 'todoList' && urlID){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);
                const title = parsedData.title;
                const completed = parsedData.completed;
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.write('Error reading file');
                        res.end();
                        return;
                    }
                    const todos = data.split('\n').filter(line => line).map(line => JSON.parse(line));
                    const todoIndex = todos.findIndex(todo => todo.id === urlID);
                    if (todoIndex === -1) {
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.write('Todo item not found');
                        res.end();
                    }  
                    if (title !== undefined) {
                        todos[todoIndex].task = title;
                    }
                    if (completed !== undefined) { 
                        todos[todoIndex].completed = completed;
                    }
                     fs.writeFile(filePath, todos.map(todo => JSON.stringify(todo)).join('\n') + '\n', (err) => {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.write('Error writing to file');
                            res.end();
                        }
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.write('Todo item updated successfully');
                        res.end();
                    });
                });
            } catch (error) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.write('Parsing error');
                res.end();
            }
        });
    }

    if(req.method === 'DELETE' && pathName === 'todoList' && urlID){
        
        fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.write('Error reading file');
                        res.end();
                    }
            const todos = data.split('\n').filter(line => line).map(line => JSON.parse(line));
            const updatedTodos = todos.filter(todo => todo.id !== urlID);
            fs.writeFile(filePath, updatedTodos.map(todo => JSON.stringify(todo)).join('\n') + '\n', (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.write('Error writing to file');
                    res.end();
                }
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('Todo item deleted successfully');
                res.end();
            });
        });
    }
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});