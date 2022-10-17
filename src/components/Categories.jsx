import React from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [{ token, categories }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const categories = response.data.categories.items;
      console.log(categories);
      dispatch({ type: reducerCases.SET_CATEGORIES, categories });
    };
    getCategories();
  }, [token, dispatch]);

  return (
    <Container>
      <div>
        {categories.map((category) => {
          return (
            <div className="categories">
              <h2 className="category-name">{category.name}</h2>
              <img
                key={category.id}
                src={category.icons[0].url}
                onClick={() => {
                  navigate(`/playlists/${category.id}${window.location.hash}`);
                }}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  .categories {
    display: inline-block;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
    img {
      cursor: pointer;
    }
  }
  .category-name {
    color: white;
  }
`;
