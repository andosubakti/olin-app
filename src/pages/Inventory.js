import React from "react";
import { Row, Col } from 'antd';

const Inventory = () => {

    return (
        <div style={{ height: "calc(88vh)", backgroundColor: "#FFF", marginTop: 20 }}>
            <Row justify="center" align="middle">
                <Col xs={12} md={8} lg={6} style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 40 }}>INVENTORY PAGE</span>
                </Col>
            </Row>
        </div>
    );
}

export default (Inventory)