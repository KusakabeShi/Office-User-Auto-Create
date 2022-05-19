import React, {useState} from 'react'
import {Row, Col, Button, Space, Modal} from 'antd'

import ContentForm from './ContentForm'
import Notice from './Notice'


export default function Content() {
    const contentBg = {
        background: 'url(https://i.loli.net/2020/01/25/KEScJXCBfAzaIjW.png) no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '95vh'
    }
    const lineOne = {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffffff',
    }
    const lineTwo = {
        fontSize: 20,
        fontWeight: 400,
        color: '#ffffff',
    }

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Row style={contentBg}>
            <Col lg={{span: 14, offset: 5}}
                 xs={{span: 22, offset: 1}}
                 className="display-flex align-center justify-around"
            >
                <div className="text-center">
                    <Notice/>

                    <span style={lineOne}>Welcome Office</span><br/>
                    <span style={lineTwo}>You can create, communicate, collaborate and complete important tasks here.</span>
                    <span style={lineTwo}>Microsoft has the right to ultimate interpretation!</span>
                    <br/>
                    <br/>

                    <Space>
                        <Button style={{width: 110}}
                                type="primary" danger size="large"
                                onClick={() => setModalVisible(v => !v)}
                        >
                            Get Office
                        </Button>
                        <Modal
                            title="Get Office"
                            centered
                            visible={modalVisible}
                            width={1000}
                            maskClosable={false}
                            destroyOnClose
                            footer={false}
                            onCancel={() => setModalVisible(false)}
                        >
                            <ContentForm/>
                        </Modal>

                        <Button style={{width: 110}}
                                size="large"
                                onClick={() =>
                                    window.open(
                                        'https://office.com/login'
                                    )}
                        >
                            Log in
                        </Button>
                    </Space>
                </div>
            </Col>
        </Row>
    )
}
