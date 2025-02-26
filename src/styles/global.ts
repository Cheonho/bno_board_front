import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
* {
  margin:0;
  padding:0;
}
.non-btn {
  border: none;
  background: none;
  font-size: 15px;
  cursor: pointer;
}
.non-btn:hover {
  color: rgba(168, 168, 179, 0.7);
}
`
export default GlobalStyles;