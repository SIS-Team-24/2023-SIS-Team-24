# SIS-Team-24

PROJECT: NLP
Web application using React + TS Frontend with Python + FastAPI backend

## Team Members
* [Grace Billiris](https://www.linkedin.com/in/grace-billiris/) [13925894](https://github.com/gracebilliris)
* [Roshel Gonzales](https://www.linkedin.com/in/roshelgonzales/) (13883931)
* [Kieren Karanjia]() (13912795)
* [Stephen Brown]() (13934551)
* [Chung bong Ip]() (13799616)
* [Henry Goodman](https://github.com/henrygoodman) (13032204)
* [Srujan Kaukuntla]() (13928229)

## Pre-Requisites:
The following are required to bootstrap all other dependencies./
- node >16
- npm
- Python3.11

## Usage:

### Server:

- Execute any of these commands within the `server` directory

`cd server`

- (Optional) Create a Python Virtual Environment
`python3 -mvenv .venv && source .venv/bin/activate`

- Install dependencies
`pip3 install -r requirements.txt`

- Run the server in watch mode
`uvicorn src.main:app --reload` or `npm run server`


### Client:

- Execute any of these commands within the `client` directory

`cd client`

- Install dependencies
`npm install`

- Build and run the client (Recommended)
`npm run build && npm run start`

### Fullstack

- Install all dependencies (both ends)
`npm run install-all`

- Run both the frontend app and backend server concurrently (execute in root directory)
`npm run dev`
