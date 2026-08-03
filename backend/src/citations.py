def extract_sources(documents):

    sources = []

    seen = set()

    for doc in documents:

        source = doc.metadata.get("source", "Unknown")

        page = doc.metadata.get("page", "?")

        key = (source, page)

        if key not in seen:

            seen.add(key)

            sources.append(
                {
                    "document": source,
                    "page": page
                }
            )

    return sources