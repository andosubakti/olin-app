import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Col, Steps, message, Upload } from "antd";
import {
  EnvironmentOutlined,
  FileDoneOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { AutoComplete } from "../components/AutoComplete";
import TopBar from "../components/TopBar";
import { APIServices } from "../services";
import Auth from "../services/Auth";
import { dialog } from "../utils/alert";

const { Content } = Layout;

const Register = () => {
  let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKabupaten, setListKabupaten] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);

  useEffect(() => {
    getProvinsi();
  }, []);

  const getProvinsi = () => {
    APIServices.getProvinsi()
      .then((res) => {
        let response = res.data;
        if (response.value) {
          let arr = [];

          response.value.forEach((item) => {
            arr.push({
              ...item,
              value: item.name,
            });
          });

          //   console.log(arr);
          setListProvinsi(arr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKabupaten = (id_provinsi) => {
    APIServices.getKabupaten(id_provinsi)
      .then((res) => {
        let response = res.data;
        if (response.value) {
          let arr = [];

          response.value.forEach((item) => {
            arr.push({
              ...item,
              value: item.name,
            });
          });

          setListKabupaten(arr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKecamatan = (id_kabupaten) => {
    APIServices.getKecamatan(id_kabupaten)
      .then((res) => {
        let response = res.data;
        if (response.value) {
          let arr = [];

          response.value.forEach((item) => {
            arr.push({
              ...item,
              value: item.name.toUpperCase(),
            });
          });

          setListKecamatan(arr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let listBidangUsaha = [
    { value: "Laboratorium", label: "Laboratorium" },
    { value: "Klinik", label: "Klinik" },
  ];

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Layout>
      <TopBar />
      <Content style={{ backgroundColor: "#FFF" }}>
        <Row style={{ minHeight: 600, minWidth: "100vh" }} justify="center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{ position: "absolute", bottom: 0 }}
          >
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,160L60,160C120,160,240,160,360,138.7C480,117,600,75,720,80C840,85,960,139,1080,144C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
          <Col xs={12} md={4} lg={6} style={{ marginTop: 100 }}>
            <Steps
              style={{ height: 200 }}
              direction="vertical"
              current={currentStep}
              items={[
                {
                  icon: (
                    <span
                      style={{ borderRadius: "50%", width: 100, height: 100 }}
                    >
                      <EnvironmentOutlined style={{ fontSize: 40 }} />
                    </span>
                  ),
                  title: (
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      Pendaftaran Sarana
                    </span>
                  ),
                },
                {
                  icon: (
                    <span
                      style={{ borderRadius: "50%", width: 100, height: 100 }}
                    >
                      <FileDoneOutlined style={{ fontSize: 40 }} />
                    </span>
                  ),
                  title: (
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      Register
                    </span>
                  ),
                },
              ]}
            />
          </Col>
          <Col xs={12} md={8} lg={6} style={{ marginTop: 30 }}>
            <div
              style={{
                padding: 40,
                backgroundColor: "#FFF",
                borderRadius: 10,
                borderBottom: "solid 1px",
                boxShadow: "1px 5px 10px #888888",
                transition: `height 0.2s`,
                animation: "ease-in",
                maxHeight: 700,
                overflowY: "auto",
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Email wajib diisi!";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Format Email salah!";
                  }

                  if (!values.password) {
                    errors.password = "Kata Sandi wajib diisi!";
                  }

                  if (!values.confirm_password) {
                    errors.confirm_password =
                      "Konfirmasi Kata Sandi wajib diisi!";
                  } else {
                    if (values.confirm_password !== values.password) {
                      errors.confirm_password = "Kata Sandi tidak cocok!";
                    }
                  }

                  if (!values.nama_perusahaan) {
                    errors.nama_perusahaan = "Nama Perusahaan wajib diisi!";
                  }

                  if (!values.npwp_perusahaan) {
                    errors.npwp_perusahaan = "NPWP Perusahaan wajib diisi!";
                  }

                  if (!values.alamat_perusahaan) {
                    errors.alamat_perusahaan = "Alamat Perusahaan wajib diisi!";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    Auth.register(values);
                    dialog({
                      icon: "success",
                      title: "Registrasi Berhasil!",
                    }).then(() => {
                      navigate("/login");
                    });
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting, values, setFieldValue }) =>
                  currentStep === 0 ? (
                    // FORM PENDAFTARAN SARANA
                    <Form>
                      <span
                        style={{
                          display: "block",
                          fontSize: 20,
                          fontWeight: "bold",
                          marginBottom: 30,
                          transition: "opacity 0.6s linear",
                        }}
                      >
                        Input Data Perusahaan
                      </span>
                      <Row style={{ marginBottom: 10, marginTop: 30 }}>
                        {values.bidang_usaha && (
                          <span style={{ fontWeight: "bold" }}>
                            Bidang Usaha
                          </span>
                        )}
                        <Field
                          component={() => (
                            <AutoComplete
                              name="bidang_usaha"
                              placeholder="Bidang Usaha"
                              options={listBidangUsaha}
                              setFieldValue={setFieldValue}
                            />
                          )}
                        />
                        <ErrorMessage name="bidang_usaha" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.nama_perusahaan && (
                          <span style={{ fontWeight: "bold" }}>
                            Nama Perusahaan
                          </span>
                        )}
                        <Field
                          type="text"
                          name="nama_perusahaan"
                          placeholder="Nama Perusahaan*"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage name="nama_perusahaan" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.npwp_perusahaan && (
                          <span style={{ fontWeight: "bold" }}>
                            NPWP Perusahaan
                          </span>
                        )}
                        <Field
                          type="text"
                          name="npwp_perusahaan"
                          placeholder="NPWP Perusahaan*"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage name="npwp_perusahaan" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.alamat_perusahaan && (
                          <span style={{ fontWeight: "bold" }}>Alamat</span>
                        )}
                        <Field
                          type="text"
                          name="alamat_perusahaan"
                          placeholder="Alamat Sesuai NPWP*"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage
                          name="alamat_perusahaan"
                          component="div"
                        />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.provinsi && (
                          <span style={{ fontWeight: "bold" }}>Provinsi</span>
                        )}
                        <Field
                          component={() => (
                            <AutoComplete
                              name="provinsi"
                              placeholder="Provinsi"
                              options={listProvinsi}
                              setFieldValue={setFieldValue}
                              onValueChange={() => {
                                setFieldValue("kabupaten", null, false);
                                setFieldValue("kecamatan", null, false);
                              }}
                              callFunction={getKabupaten}
                            />
                          )}
                        />
                        <ErrorMessage name="provinsi" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.kabupaten && (
                          <span style={{ fontWeight: "bold" }}>
                            Kabupaten/Kota
                          </span>
                        )}
                        <Field
                          component={() => (
                            <AutoComplete
                              name="kabupaten"
                              placeholder="Kabupaten"
                              options={listKabupaten}
                              setFieldValue={setFieldValue}
                              onValueChange={(v) => {
                                setFieldValue("kecamatan", null, false);
                              }}
                              callFunction={getKecamatan}
                              disabled={!values.provinsi}
                            />
                          )}
                        />
                        <ErrorMessage name="kabupaten" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.kecamatan && (
                          <span style={{ fontWeight: "bold" }}>Kecamatan</span>
                        )}
                        <Field
                          component={() => (
                            <AutoComplete
                              name="kecamatan"
                              placeholder="Kecamatan"
                              options={listKecamatan}
                              setFieldValue={setFieldValue}
                              disabled={!values.kabupaten}
                            />
                          )}
                        />
                        <ErrorMessage name="kecamatan" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 20 }}>
                        {values.kode_pos && (
                          <span style={{ fontWeight: "bold" }}>Kode Pos</span>
                        )}
                        <Field
                          type="text"
                          name="kode_pos"
                          placeholder="Kode Pos"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage name="kode_pos" component="div" />
                      </Row>
                      <span
                        style={{
                          display: "block",
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        Upload Kelengkapan Data
                      </span>
                      <Row style={{ marginBottom: 10 }}>
                        <Dragger {...props} style={{ minWidth: "100%" }}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p
                            className="ant-upload-text"
                            style={{ padding: 30 }}
                          >
                            Klik atau drag file ke area ini untuk mengunggah
                          </p>
                          <p className="ant-upload-hint">Unggah NIB Valid</p>
                        </Dragger>
                      </Row>

                      <button
                        onClick={() => {
                          setCurrentStep(1);
                        }}
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "#FF6600",
                          color: "#FFF",
                          width: "100%",
                          padding: 10,
                          borderRadius: 5,
                          cursor: "pointer",
                        }}
                      >
                        Selanjutnya
                      </button>
                    </Form>
                  ) : (
                    // FORM REGISTER
                    <Form>
                      <span
                        style={{
                          display: "block",
                          fontSize: 20,
                          fontWeight: "bold",
                          marginBottom: 30,
                        }}
                      >
                        Register Akun Olin
                      </span>
                      <Row style={{ marginBottom: 10 }}>
                        {values.email && (
                          <span style={{ fontWeight: "bold" }}>Email</span>
                        )}
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email*"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage name="email" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.password && (
                          <span style={{ fontWeight: "bold" }}>Kata Sandi</span>
                        )}
                        <Field
                          type="password"
                          name="password"
                          placeholder="Kata Sandi*"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage name="password" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        {values.confirm_password && (
                          <span style={{ fontWeight: "bold" }}>
                            Konfirmasi Kata Sandi
                          </span>
                        )}
                        <Field
                          type="password"
                          name="confirm_password"
                          placeholder="Konfirmasi Kata Sandi*"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 5,
                          }}
                        />
                        <ErrorMessage name="confirm_password" component="div" />
                      </Row>
                      <Row style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex" }}>
                          <Field
                            type="checkbox"
                            name="checkbox"
                            style={{ width: 40, borderRadius: 5, height: 40 }}
                          />
                          <span>
                            Dengan membuat akun, Anda menyetujui &nbsp;
                            <span
                              style={{ color: "#FF6600", cursor: "pointer" }}
                            >
                              Ketentuan Penggunaan dan Pemberitahuan Privasi
                            </span>{" "}
                            aplikasi OLIN
                          </span>
                        </div>
                      </Row>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          onClick={() => {
                            setCurrentStep(0);
                          }}
                          disabled={isSubmitting}
                          style={{
                            backgroundColor: "#FFF",
                            color: "#888888",
                            width: "48%",
                            padding: 10,
                            borderRadius: 5,
                            cursor: "pointer",
                          }}
                        >
                          Kembali
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          style={{
                            backgroundColor: "#FF6600",
                            color: "#FFF",
                            width: "48%",
                            padding: 10,
                            borderRadius: 5,
                            cursor: "pointer",
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Register;
