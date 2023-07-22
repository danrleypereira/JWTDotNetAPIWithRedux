import pandas as pd
import glob
from sqlalchemy import create_engine, Column, Integer, String, Float, URL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define your database connection string here
url_object = URL.create(
    "postgresql+psycopg2",
    username="postgres",
    password="changeme",
    host="170.83.132.66",
    database="postgres",
)
connection_string = url_object #"postgresql://postgres:changeme@170.83.132.66:5432/postgres"

# Load CSV data into a pandas DataFrame
csv_files = glob.glob('./*.csv')
# Merge all the CSV files into a single DataFrame
df_list = []
for csv_file in csv_files:
    df = pd.read_csv(csv_file)
    df_list.append(df)
merged_df = pd.concat(df_list, ignore_index=True)

# Create a database engine and bind it to the Base
engine = create_engine(connection_string, echo=True)
Base = declarative_base()
Base.metadata.bind = engine

# Define the Veiculo entity class
class Veiculo(Base):
    __tablename__ = 'Veiculos'
    Id = Column(Integer, primary_key=True, autoincrement=True)
    Nome = Column(String(100), nullable=False)
    Marca = Column(String(100), nullable=False)
    Modelo = Column(String(100), nullable=False)
    Foto = Column(String, nullable=False)
    Valor = Column(Float, nullable=False)

# Create the table in the database (if not already exists)
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Function to convert CSV data into Veiculo entities and insert them into the database
def insert_data_to_db():
    for index, row in merged_df.iterrows():
        name = row['Name']
        year = row['Year']
        kilometers = row['Kilometers']
        city = row['City']
        image_src = row['Image Source']
        price = float(row['Price'].replace("R$", "").replace(".", "").replace(",", "."))

        veiculo = Veiculo(
            Nome=name,
            Marca=name.split(' ')[0],  # Extract the brand from the name
            Modelo=' '.join(name.split(' ')[1:]),  # Extract the model from the name
            Foto=image_src,
            Valor=price,
        )
        session.add(veiculo)

    session.commit()

try:
    insert_data_to_db()
    print("Data inserted successfully into the database.")
except Exception as e:
    print("Error occurred while inserting data:", e)

# Close the session
session.close()
