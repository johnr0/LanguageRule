import sqlite3
import os

DEFAULT_PATH=os.path.join(os.path.dirname(__file__), 'database.sqlite3')

def db_connect(db_path=DEFAULT_PATH):
    con=sqlite3.connect(db_path)
    return con

def init_db(cur):

    with open(os.path.join(os.path.dirname(__file__), 'schema.sql')) as f:
        cur.executescript(f.read())