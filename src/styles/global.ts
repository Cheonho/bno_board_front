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

.btn-pr {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  width: 50%;
}

.btn-pr button:hover {
  background-color: #0056b3;
}
`
export default GlobalStyles;