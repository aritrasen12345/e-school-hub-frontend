import React, { useEffect, useState } from "react";
import { Card, Col, Row, notification, Button, Tag, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AppLayout from "../layout/AppLayout";
import AddStandardModal from "../components/modal/AddStandardModal";
import networkRequest from "../lib/apis/networkRequest";
import StandardEditModal from "../components/modal/EditStandardModal";
import StandardDeleteModal from "../components/modal/DeleteStandardModal";

const ManageStandard = () => {
  const color = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  const getRandomColor = () => {
    const randomColorIndex = Math.floor(Math.random() * color.length);
    const randomColor = color[randomColorIndex];
    return randomColor;
  };

  const [standardValue, setStandardValue] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [dataToDelete, setDataToDelete] = useState("");
  const [loading, setLoading] = useState(false);

  const getStandardList = async () => {
    setLoading(true);
    try {
      const { isOk, message, data } = await networkRequest(
        "/standard/get_standards_list",
        "POST",
        {},
        true
      );
      if (isOk) {
        setStandardValue(data);
        setLoading(false);
      } else {
        notification.error({
          message: message || "Something went wrong :(",
        });
        setLoading(false);
      }
    } catch (err) {
      notification.error({
        message: "Something went wrong",
      });
      console.log("Error =", err);
      setLoading(false);
    }
  };

  const addStandardHandler = async (values) => {
    const reqBody = {
      standard_name: values.Standard,
      sections: values.Section.map((sec, _) => ({
        label: sec,
        value: sec,
      })),
    };
    try {
      const { isOk, message } = await networkRequest(
        "/standard/create_standard",
        "POST",
        reqBody,
        true
      );
      if (!isOk) {
        notification.error({
          message: message || "Something went wrong :(",
        });
      } else {
        getStandardList();
      }
    } catch (err) {
      console.log("Error =", err);
    }
  };

  const editStandardHandler = async (values) => {
    const reqBody = {
      standard_id: values.standard_id,
      standard_name: values.standard_name,
      sections: values.sections.map((section, _) => ({
        label: section.label,
        value: section.value,
      })),
    };
    try {
      const { isOk, message } = await networkRequest(
        "/standard/update_standard",
        "POST",
        reqBody,
        true
      );
      if (!isOk) {
        notification.error({
          message: message || "Something went wrong :(",
        });
      } else {
        setIsModalVisible(false);
        notification.success({
          message: message || "Successfully Updated",
        });
        getStandardList();
      }
    } catch (err) {
      console.log("Error =", err);
    }
  };

  const deleteStandardHandler = async (values) => {
    if (values === "OK") {
      const reqBody = {
        standard_id: dataToDelete._id,
      };
      console.log("reqBody", reqBody);
      try {
        const { isOk, message } = await networkRequest(
          "/standard/delete_standard",
          "POST",
          reqBody,
          true
        );
        if (!isOk) {
          notification.error({
            message: message || "Something went wrong :(",
          });
        } else {
          setIsDeleteModalVisible(false);
          notification.success({
            message: message || "Successfully Deleted :)",
          });
          getStandardList();
        }
      } catch (err) {
        console.log("Error =", err);
      }
    } else {
      notification.error({
        message: "Modal response Invalid",
      });
    }
  };

  const editHandler = (values) => {
    setIsModalVisible(true);
    setDataToUpdate(values);
  };

  const deleteHandler = (values) => {
    setIsDeleteModalVisible(true);
    setDataToDelete(values);
  };

  const closeEditModal = () => {
    setIsModalVisible(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  useEffect(() => {
    getStandardList();
  }, []);

  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <AddStandardModal addStandardValues={addStandardHandler} />
        {isModalVisible && (
          <StandardEditModal
            visible={isModalVisible}
            onClose={closeEditModal}
            payloadData={dataToUpdate}
            modalDataToUpadte={editStandardHandler}
          />
        )}
        {isDeleteModalVisible && (
          <StandardDeleteModal
            visible={isDeleteModalVisible}
            onClose={closeDeleteModal}
            payloadData={dataToDelete}
            response={deleteStandardHandler}
          />
        )}
      </div>
      {!standardValue ? (
        <Empty />
      ) : (
        <div loading={loading} style={{ margin: "1rem" }}>
          <Row>
            {standardValue.map((values, idx) => {
              return (
                <Col span={4} key={idx}>
                  <Card
                    key={idx}
                    style={{
                      textAlign: "center",
                      margin: "0.5rem",
                      height: "35vh",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: "0.5rem",
                      }}
                    >
                      <div
                        style={{ marginLeft: "auto", marginRight: "0.2rem" }}
                      >
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => editHandler(values)}
                        />
                      </div>
                      <div>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => deleteHandler(values)}
                        />
                      </div>
                    </div>
                    <p style={{ margin: "0.5rem" }}>
                      Std:{" "}
                      <b>
                        <Tag color={getRandomColor()}>
                          {values.standard_name}
                        </Tag>
                      </b>
                    </p>
                    <br />
                    <p style={{ margin: "0.5rem" }}>Section: </p>
                    <Row>
                      {values.sections.map((section, idx) => {
                        return (
                          <Col span={8} key={idx}>
                            <Tag
                              color={getRandomColor()}
                              key={idx}
                              style={{ margin: "0.2rem" }}
                            >
                              {section.label}
                            </Tag>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </AppLayout>
  );
};

export default ManageStandard;
