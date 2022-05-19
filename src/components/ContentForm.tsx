import React, {useState, useEffect} from 'react'
import {Spin, Form, Button, Input, message, Row, Col, Select} from 'antd'
import {CopyOutlined, KeyOutlined, MailOutlined} from '@ant-design/icons'
import copy from 'copy-to-clipboard'


export default function ContentForm() {
    const [spinning, setSpinning] = useState(false)
    const [officeConfig, setOfficeConfig] = useState({
        subscriptions: [
            {
                name: '',
                sku: ''
            },
        ],
        domains: [],
        getCodeLink: ''
    })
    const [createdAccount, setCreatedAccount] = useState({
        email: '',
        password: '',
    })

    const onFinish = (formData: object) => {
        setSpinning(true)
        fetch(
            `${process.env.REACT_APP_API_BASE_URL}getOffice`,
            {
                method: 'POST',
                body: JSON.stringify(formData)
            }
        )
            .then(r => {
                r.json()
                    .then(data => {
                        if (data.success) {
                            message.success(data.msg)
                            setCreatedAccount(data.account)
                        } else {
                            message.error(data.msg.toString())
                        }
                    })
                setSpinning(false)
            })
            .catch(e => {
                message.error(JSON.stringify(e))
            })
    }

    useEffect(() => {
        setSpinning(true)
        fetch(
            `${process.env.REACT_APP_API_BASE_URL}getOfficeConfig`
        )
            .then(r => {
                r.json()
                    .then(data => {
                        setOfficeConfig(data)
                    })
                setSpinning(false)
            })
            .catch(e => {
                message.error(JSON.stringify(e))
            })
    }, [])


    const CreatedForm = (
        <Form labelCol={{span: 4}} wrapperCol={{span: 20}}>
            <Form.Item label="Email">
                <Input
                    value={createdAccount.email}
                    prefix={<MailOutlined/>}
                    suffix={<CopyOutlined onClick={() => {
                        copy(createdAccount.email)
                        message.success('Copy Email')
                    }}/>}
                />
            </Form.Item>

            <Form.Item label="Password">
                <Input
                    value={createdAccount.password}
                    prefix={<KeyOutlined/>}
                    suffix={<CopyOutlined onClick={() => {
                        copy(createdAccount.password)
                        message.success('Copy Password')
                    }}/>}
                />
            </Form.Item>

            <Form.Item style={{float: 'right'}}>
                <Button
                    onClick={() =>
                        window.open(
                            'https://office.com/login'
                        )}
                    type="primary"
                    htmlType="submit"
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )

    const CreateForm = (
        <Form
            name="basic"
            onFinish={onFinish}
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
        >
            <Form.Item
                label="Subscription"
                name="subscription"
                rules={[{required: true, message: '必選'}]}
            >
                <Select placeholder="Choose subscription">
                    {officeConfig.subscriptions.map(subscription => (
                        <Select.Option
                            value={subscription.sku}
                            key={subscription.sku}
                        >
                            {subscription.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="email"
                name="email"
                rules={[{required: true, message: '必填'}]}
            >
                <Input.Group compact>
                    <Form.Item
                        name={['email', 'username']}
                        noStyle
                        rules={[{required: true, message: '必填'}]}
                    >
                        <Input style={{width: '55%'}} placeholder="username"/>
                    </Form.Item>

                    <Form.Item
                        name={['email', 'domain']}
                        noStyle
                        rules={[{required: true, message: '必填'}]}
                    >
                        <Select style={{width: '45%'}} placeholder="Choose domain">
                            {officeConfig.domains.map(domain => (
                                <Select.Option value={domain} key={domain}>
                                    @{domain}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item
                label="Code"
                name="code"
                rules={[{required: true, message: '必填'}]}
            >
                <Input placeholder="Code"
                       addonAfter={(
                           <a href={officeConfig.getCodeLink}
                              target="_blank" rel="noreferrer"
                           >Get Code</a>
                       )}
                />
            </Form.Item>

            <Form.Item style={{float: 'right'}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )


    return (
        <Spin spinning={spinning}>
            <Row>
                <Col lg={{span: 14, offset: 5}}
                     xs={{span: 24}}
                >
                    {!!createdAccount.password ? CreatedForm : CreateForm}
                </Col>
            </Row>
        </Spin>
    )
}
