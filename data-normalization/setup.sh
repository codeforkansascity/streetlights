#!/usr/bin/env bash

if [ ! -f .venv/bin/python ]; then
    python3 -m venv .venv/
    curl https://bootstrap.pypa.io/get-pip.py | .venv/bin/python
fi
.venv/bin/pip install -r requirements.txt

