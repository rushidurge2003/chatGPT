import React, { useState } from 'react';
import axios from 'axios';
import { Loading } from './Loading'
import { Input, Button, Avatar,message } from 'antd';
import { ArrowUpOutlined, } from '@ant-design/icons';

const { TextArea } = Input;

export const Home = () => {
    const [chattext, setChatText] = useState('');
    const [userQue, setUserQue] = useState("")
    const [response, setResponse] = useState('');
    const [btnClick, setBtnClick] = useState(false)
    const [load, setLoad] = useState(false)
    const [preData, setPreData] = useState([])
    const [que, setQue] = useState("")
    const [ans, setAns] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (chattext === "") {
            message.warning("Please enter something...!")
        } else {
            if (ans !== "" && que !== "") {
                preData.unshift({ q: que, a: ans })
                console.log("Obj R : ", preData)
            }
            setUserQue(chattext)
            setChatText("")
            setLoad(true)
            setBtnClick(true)
            const result = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBRLijV3FsQ1AF0dUfQ_KgL_CirQCVGuJg", { contents: [{ parts: [{ text: chattext }] }] })
            setResponse(result.data.candidates?.[0].content.parts?.[0].text)
            // console.log(result.data.candidates?.[0].content.parts?.[0].text)
            setLoad(false)
            setQue(userQue)
            setAns(result.data.candidates?.[0].content.parts?.[0].text)
        }
    };

    return (
        <>
            <div className='fixed-top' style={{ margin: 20 }}>
                <h3 className='text-center'>Chat GPT</h3>
            </div>

            {
                btnClick ?
                    <div>
                        <div className='d-flex'>
                            <div>
                                <Avatar
                                    style={{ backgroundColor: "green", verticalAlign: 'middle', }}
                                    size="large"
                                >
                                    User
                                </Avatar>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
                                <b>{userQue}</b>
                            </div>
                        </div>
                        <div className='d-flex' style={{ marginTop: 20 }}>
                            <div>
                                <Avatar
                                    style={{ backgroundColor: "orange", verticalAlign: 'middle', }}
                                    size="large"
                                >
                                    ChatGPT
                                </Avatar>
                            </div>
                            <div style={{ marginLeft: 20, width: "100%" }}>
                                {
                                    load ? <Loading /> : <pre>{response}</pre>
                                }
                                <hr />
                            </div>
                        </div>
                        <div style={{ marginBottom: 100, width: "100%" }}>
                            {
                                preData.length === 0 ? "" :
                                    preData.map((x) => {
                                        return (
                                            <>
                                                <div className='d-flex' style={{ marginTop: 30 }}>
                                                    <div>
                                                        <Avatar
                                                            style={{ backgroundColor: "green", verticalAlign: 'middle', }}
                                                            size="large"
                                                        >
                                                            User
                                                        </Avatar>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
                                                        <b>{x.q}</b>
                                                    </div>
                                                </div>
                                                <div className='d-flex' style={{ marginTop: 20 }}>
                                                    <div>
                                                        <Avatar
                                                            style={{ backgroundColor: "orange", verticalAlign: 'middle', }}
                                                            size="large"
                                                        >
                                                            ChatGPT
                                                        </Avatar>
                                                    </div>
                                                    <div style={{ marginLeft: 20, width: "100%" }}>
                                                        {
                                                            <pre>{x.a}</pre>
                                                        }
                                                        <hr />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                            }
                        </div>
                    </div> : ""
            }

            <div className='fixed-bottom d-flex justify-content-center row' style={{borderRadius: 20 , width: "80%", margin: "auto", marginBottom: 30,backgroundColor:"black",padding:10 }}>
                <div className='row'>
                    <div className='col-10'>
                        <TextArea
                            value={chattext}
                            onChange={(e) => { setChatText(e.target.value) }}
                            placeholder="Message ChatGPT"
                            autoSize={{ minRows: 2, maxRows: 10 }}
                            style={{ borderRadius: 20 }}
                        />
                    </div>
                    <div className='col-2' style={{ display: "flex", justifyContent: "center", alignItems: "end" }}>
                        <Button type="primary" style={{ backgroundColor: "white" }} shape="round" icon={<ArrowUpOutlined style={{color:"black"}} />} size="large" onClick={(e) => { handleSubmit(e) }}></Button>
                    </div>
                </div>
            </div>
        </>
    );
}
