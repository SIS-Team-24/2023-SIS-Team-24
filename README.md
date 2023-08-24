# SIS-Team-24

### PROJECT: Natural Language Processor (NLP) web application
### Tech Stack:
* **Frontend**: REACT, Tailwindcss and TS
* **Backend**: FastAPI and Python
* **Database**: MongoDB

## Team Members
* [Grace Billiris](https://www.linkedin.com/in/grace-billiris/) [(13925894)](https://github.com/gracebilliris)
* [Roshel Gonzales](https://www.linkedin.com/in/roshelgonzales/) (13883931)
* [Kieren Karanjia]() (13912795)
* [Stephen Brown](https://github.com/SSBdevelopment) (13934551)
* [Chung bong Ip]() (13799616)
* [Henry Goodman](https://github.com/henrygoodman) (13032204)
* [Srujan Kaukuntla](https://github.com/srujankarthik) (13928229)

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

## Development Conventions:

### Branch Name

* `[developer_name]/[task_name]` e.g. john/style-summarisation-button

### Pull Request Reviews

* As a Reviewer, only leave comments, approvals or change requests - Let the PR creator administrate (e.g. merge, delete the branch) the PR.
* Each PR will require at least **2** approvals
* Pay attention to merge conflicts, they must be resovled before being merged.

### Documentation

* Leave comments for each function in regards to their purpose, and possibly an explanation of the process
* Don't be afraid to leave small notes and comments whilst developing
