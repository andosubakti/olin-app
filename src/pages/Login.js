import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { Layout, Row, Col, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import TopBar from "../components/TopBar";
import Auth from "../services/Auth";

const { Content } = Layout;

const Login = () => {
  let navigate = useNavigate();

  return (
    <Layout className="layout-login" style={{ backgroundColor: "#A3C3F2" }}>
      <TopBar />
      <Content className="curve">
        <Row
          style={{ minHeight: 470, paddingLeft: 100 }}
          justify="start"
          align="middle"
        >
          <Col>
            <span style={{ display: "block", fontSize: 60, fontWeight: 500 }}>
              Selamat Datang di Solusi <br />
              Perangkat Lunak Farmasi
            </span>
            <span style={{ display: "block", fontSize: 30, fontWeight: 100 }}>
              Sistem Manajemen Apotek Online
            </span>
          </Col>
        </Row>
        <Row justify="center">
          <img
            src="/image/doctors.jpg"
            alt="Foto Dokter"
            width={900}
            height={500}
            style={{ position: "absolute", top: 200, right: 0 }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{ position: "absolute", bottom: 0, zIndex: 1 }}
          >
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,160L60,160C120,160,240,160,360,138.7C480,117,600,75,720,80C840,85,960,139,1080,144C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
          <Col style={{ zIndex: 2 }}>
            <span
              style={{
                display: "block",
                fontSize: 25,
                fontWeight: 500,
                marginBottom: 20,
                textShadow:
                  "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
              }}
            >
              Silakan masuk ke dalam akun dan kelola apotek Anda.
            </span>
            <div
              style={{
                minWidth: "400px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    console.log(values);
                    Auth.login(values).then(() => {
                      navigate("/");
                    });
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    {/* {console.log(values)} */}
                    <Row style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: "bold" }}>Email</span>
                      <Input
                        prefix={<MailOutlined />}
                        type="text"
                        placeholder="Email"
                        style={{ width: "100%", padding: 10, borderRadius: 5 }}
                        name="email"
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div" />
                    </Row>
                    <Row style={{ marginBottom: 10 }}>
                      <span style={{ fontWeight: "bold" }}>Kata Sandi</span>
                      <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Kata Sandi"
                        style={{ width: "100%", padding: 10, borderRadius: 5 }}
                        name="password"
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                      />
                    </Row>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "#1AA7EC",
                          color: "#FFF",
                          width: "100%",
                          padding: 10,
                          border: "none",
                          borderRadius: 5,
                          cursor: "pointer",
                          fontWeight: 400,
                        }}
                      >
                        Masuk
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <span
              style={{ display: "block", marginTop: 20, textAlign: "center" }}
            >
              Belum Registrasi? Silakan klik &nbsp;
              <span
                style={{ cursor: "pointer", color: "#FF6600", fontWeight: 500 }}
                onClick={() => navigate("/register")}
              >
                Daftar
              </span>
            </span>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
