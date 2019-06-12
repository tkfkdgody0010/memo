import React, { useState } from 'react';
import { Button, Layout, Row, Col, Input, Select } from 'antd'

import SDK from 'apis/SDK.js';
import IconexConnect from 'apis/IconexConnect';
import CONST from './constants';

import {
  IconConverter
} from 'icon-sdk-js'

import './App.css';
import { toUnicode } from 'punycode';


const { Header, Content } = Layout;
const { Option } = Select;



function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function stringFromUTF8Array(data) {
  const extraByteMap = [1, 1, 1, 1, 2, 2, 3, 0];
  var count = data.length;
  var str = "";

  for (var index = 0; index < count;) {
    var ch = data[index++];
    if (ch & 0x80) {
      var extra = extraByteMap[(ch >> 3) & 0x07];
      if (!(ch & 0x40) || !extra || ((index + extra) > count))
        return null;

      ch = ch & (0x3F >> extra);
      for (; extra > 0; extra -= 1) {
        var chx = data[index++];
        if ((chx & 0xC0) != 0x80)
          return null;

        ch = (ch << 6) | (chx & 0x3F);
      }
    }

    str += String.fromCharCode(ch);
  }

  return str;
}

function convertList(myData) {
  var converted = [];
  for (var j = 0; j < myData.length; j += 1) {
    converted.push(stringFromUTF8Array(hexToBytes(myData[j])))
  }
  return converted
}

function App() {
  const [mode, setMode] = useState(CONST.MODE['LOG_OUT'])
  const [memoInput, setMemoInput] = useState('')
  const [memoList, setmemoList] = useState([])
  const [myAddress, setMyAddress] = useState('')


  async function getAddress() { // 로그인
    const { iconService, callBuild } = SDK
    const myAddress = await IconexConnect.getAddress()
    console.log(myAddress)
    const myData = await iconService.call(
      callBuild({
        from: myAddress,
        methodName: 'get',
        params: {},
        to: window.CONTRACT_ADDRESS,
      })
    ).execute()


    //onsole.log(myData[0], myData[0].to)
    setmemoList(convertList(myData))
    setMode(CONST.MODE['LOG_IN'])
    setMyAddress(myAddress)
  }

  console.log(stringFromUTF8Array(hexToBytes('313233e38587e384b4e384b9e384b4e38587e384b9')))

  async function addMemo() {

    if (myAddress === '') {
      alert("지갑을 먼저 연동해주세요")
      return
    }

    if (memoInput.trim().length > 0) {
      setmemoList([memoInput, ...memoList])
      setMemoInput('')

      const txObj = SDK.sendTxBuild({
        from: myAddress,
        to: window.CONTRACT_ADDRESS,
        methodName: 'set',
        params: {
          _hack: IconConverter.fromUtf8(memoInput),
        },
      })
      const tx = await IconexConnect.sendTransaction(txObj)

      if (tx) {
        alert("메모가 성공적으로 등록되었습니다.")
      }
    }
  }

  return (
    <Layout>
      <Header>
        <Button size="large" onClick={getAddress} type="primary">ICONex 연동하기</Button>
      </Header>
      <Content>
        <Row type="flex" justify="center" align="middle" className={`page-wrap`}>
          <Col style={{ width: '80%', maxWidth: 700 }}>
            <h1>메모</h1>
            <div className="form-wrap">
              <Input size="large" style={{ width: 250 }} value={memoInput} onChange={(e) => setMemoInput(e.target.value)} />
              <Button type="primary" size="large" onClick={addMemo}>추가하기</Button>
            </div>
            <div>
              {memoList.map((item) => (
                <div className="list">{item}</div>
              ))
              }
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
