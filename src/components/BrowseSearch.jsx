import React from "react";
import styled from "styled-components";
import searchData from '../api/Search.json'

export default function BrowseSearch() {
  
  const cardData = {
    items: searchData.data.items.map((item) => ({
      title: item.content.data.title.transformedLabel,
      cardColor: item.content.data.backgroundColor.hex,
      cardUrl: item.content.data.artwork.sources[0].url,
    }))
  }
  console.log(cardData)
  return (
    <Container>
      <section className="search__browse" aria-label="Browse all">
        <div className="browse__head">
          <div>
            <div>
              <h2>Browse all</h2>
            </div>
          </div>
        </div>
        <div className="search__all__card">

        </div>
      </section>
    </Container>
  );
}

const Container = styled.div``;
