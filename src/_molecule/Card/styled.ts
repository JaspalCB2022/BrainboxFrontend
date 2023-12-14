import styled from "styled-components";

export const CardWrapper = styled.div`
  margin: 10px 10px;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #405189;
    width: 150px;
    height: 150px;
    border: 1px solid grey;

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        height: 40px;
        width: 40px;
      }
    }
  }
`;
