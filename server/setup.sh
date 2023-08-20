#!/bin/bash

# This script activates a Python virtual environment and installs dependencies for server.
# Use the Virtual Environment when running the server by running `source .venv/bin/activate`

python3 -mvenv .venv
source .venv/bin/activate
pip3 install -r requirements.txt