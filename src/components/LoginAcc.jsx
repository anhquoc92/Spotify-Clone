import React from "react";
import styled from "styled-components";

export default function LoginAcc() {
  return (
    <Container>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" />
        <label htmlFor="username">Password:</label>
        <input type="password" id="password" />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <a href="#">Sign Up</a>
        </span>
      </p>
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-grow: 1;
    padding-bottom: 1rem;
    input,
    button {
      font-family: "Nutito", sans-serif;
      font-size: 22px;
      padding: 0.25rem;
      border-radius: 0.5rem;
    }
    label, button {
        margin-top: 1rem;
    }
    button {
        padding: 0.5rem;
    }
  }
`;
