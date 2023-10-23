from fastapi import APIRouter, HTTPException, Request
from newspaper import Article

router = APIRouter()


async def scrape_website(url: str) -> str:
    article = Article(url)
    article.download()
    article.parse()

    scraped_text = article.text
    return scraped_text


@router.get("/scrape")
async def scrape(request: Request):
    url = request.query_params.get("url")

    if url is None:
        raise HTTPException(status_code=400, detail="URL parameter is missing")

    try:
        scraped_text = await scrape_website(url)

        return {"text": scraped_text}
    except HTTPException as e:
        raise e
