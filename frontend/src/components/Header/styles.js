import styled from 'styled-components';

// import { darken } from 'polished';

export const Container = styled.div`
  background: #ddd;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #000;
      font-size: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;
