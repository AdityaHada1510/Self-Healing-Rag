from  src.loader import load_pdf
from  src.splitter import split_text
from  src.vectordb import create_vector_store

print("Loading PDF...")

text = load_pdf("data/sample.pdf")

print("Splitting...")

chunks = split_text(text)

print(f"Chunks: {len(chunks)}")

print("Creating Vector Database...")

create_vector_store(chunks)

print("Done!")