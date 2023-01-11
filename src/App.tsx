import Lazy from 'lazy'
import 'assets/style/main.css'
import {
  Wrapper,
  Content
} from 'assets/style/main'
import socket from './service/Socket';
import { useEffect } from 'react'

socket.connect()

function App() {

  return (
    <Wrapper>
      <Content>
        <Lazy socket={socket} />
      </Content>
    </Wrapper>
  );
}

export default App;
