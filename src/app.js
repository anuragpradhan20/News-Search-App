let API_KEY="13c636a1e810404a9ce41242e9e7d1bb";
let url="https://newsapi.org/v2/everything?q=";
let cardContainer=document.querySelector(".newsContainer");
let inputValue=document.querySelector("#searchInput");
let searchButton=document.querySelector("#searchBtn");
window.addEventListener("load",()=>{

    fetchNews("india");
})
searchButton.addEventListener("click",()=>{
    let parameter=inputValue.value;
    fetchNews(parameter);
})
async function fetchNews(param)
{
    let api=url+param+"&apiKey="+API_KEY;
    let data=await fetch(api);
    let news=await data.json();
    displayNewsCard(news);
}
function displayNewsCard(dataList)
{
    cardContainer.innerText="";
    let articles=dataList.articles;
    articles.map((article)=>{
    if(article.urlToImage!=null && article.title!=null && article.publishedAt!=null && article.description!=null)
    {
    let card=document.createElement("div");
    card.classList.add("w-[350px]","border","border-neutral-400","p-2","rounded-md","m-4","hover:border-blue-300","hover:shadow");
    let image=document.createElement("img");
    image.classList.add("w-[350px]","h-[200px]","object-contain");
    image.src=article.urlToImage;
    card.append(image);
    let title=document.createElement("h1");
    title.classList.add("text-base","font-semibold","mt-2");
    title.innerText=article.title;
    card.append(title);
    let publishDate=document.createElement("p");
    publishDate.classList.add("text-sm","mt-2");
    const isoDateString = article.publishedAt;
    const dateObject = new Date(isoDateString);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    publishDate.innerText=formattedDate;
    card.append(publishDate);
    let description=document.createElement("p");
    description.classList.add("text-[14px]","w-full","mt-2");
    description.innerText=article.description;
    card.append(description);
    cardContainer.append(card);
    }
   })
}