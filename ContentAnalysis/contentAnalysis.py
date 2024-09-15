import requests
from fuzzywuzzy import fuzz

def get_news_articles(api_key):
    url = f'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey={api_key}'
    response = requests.get(url)
    articles = response.json().get('articles', [])
    return articles


def normalize_text(text):
    return text.lower().strip()


def check_news_validity(user_content, api_key):
    articles = get_news_articles(api_key)
    

    print("Fetched Articles:")
    for article in articles:
        print(normalize_text(article['title']))
    
    if not articles:
        return "No matching news found."

    normalized_user_content = normalize_text(user_content)
    
    print(f"Normalized User Content: {normalized_user_content}")

    for article in articles:
        article_title = normalize_text(article['title'])
        
        if normalized_user_content == article_title:
            return f"True news found: {article['title']} (Exact match)"
        
        similarity_score = fuzz.ratio(normalized_user_content, article_title)
        print(f"Comparing with: {article_title} (Similarity: {similarity_score}%)") 
        
        if similarity_score > 85:  
            return f"True news found: {article['title']} (Similarity: {similarity_score}%)"
    
    return "The news appears to be fake."

if name == "main":
    api_key = "e2c22b7bd38a48179503cf041852fbc3" 
    user_content = input("Paste the news content: ")
    result = check_news_validity(user_content, api_key)
    print(result)