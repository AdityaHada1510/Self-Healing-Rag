from rank_bm25 import BM25Okapi

class BM25Retriever:

    def __init__(self, documents):

        self.documents = documents

        self.tokens = [
            doc.page_content.lower().split()
            for doc in documents
        ]

        self.bm25 = BM25Okapi(self.tokens)

    def search(self, query, k=5):

        query_tokens = query.lower().split()

        scores = self.bm25.get_scores(query_tokens)

        ranked = sorted(
            zip(self.documents, scores),
            key=lambda x: x[1],
            reverse=True
        )

        return ranked[:k]