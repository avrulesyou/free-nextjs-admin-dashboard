import psycopg2
import random
import string

# Establish a connection to the database
conn = psycopg2.connect(
    database="abhishekvishwakarma",
    user="abhishekvishwakarma",
    password="1Life@Developer",
    host="localhost",
    port="5432"
)

# Create a cursor object
cur = conn.cursor()

# Define a function to generate random data
def random_data():
    college_name = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=10))
    city = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=10))
    state = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=2))
    country = 'India'
    rating = random.randint(1, 10)
    courses = [''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=10)) for _ in range(3)]
    return college_name, city, state, country, rating, courses

# Insert 100 random entries into the table
clgid = 2000

for clgid, _ in enumerate(range(100), start=2001):
    college_name, city, state, country, rating, courses = random_data()
    cur.execute(
        "INSERT INTO colleges (college_id, name, city, state, country, rating, courses) VALUES (%s ,%s, %s, %s, %s, %s, %s)",
        (clgid, college_name, city, state, country, rating, courses)
    )

# Commit the changes and close the connection
conn.commit()
cur.close()
conn.close()