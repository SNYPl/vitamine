"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Switch, message, Popconfirm, Modal, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import styles from "./page.module.scss";

interface SpecialOffer {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  buttonText: string;
  linkUrl: string;
  isActive: boolean;
  badgeText: string;
}

const SpecialOffersPage = () => {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/specialOffers");
      setOffers(response.data.offers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching offers:", error);
      message.error("Failed to fetch special offers");
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await axios.put(`/api/specialOffers/${id}`, {
        isActive: !currentStatus,
      });
      message.success(`Offer ${!currentStatus ? "activated" : "deactivated"} successfully`);
      fetchOffers();
    } catch (error) {
      console.error("Error toggling offer status:", error);
      message.error("Failed to update offer status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/specialOffers/${id}`);
      message.success("Offer deleted successfully");
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
      message.error("Failed to delete offer");
    }
  };

  const showModal = (offer?: SpecialOffer) => {
    setEditingOffer(offer || null);
    if (offer) {
      form.setFieldsValue(offer);
      setImageUrl(offer.imageUrl);
    } else {
      form.resetFields();
      setImageUrl("");
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Add the image URL to the form values
      values.imageUrl = imageUrl || values.imageUrl;
      
      if (editingOffer) {
        // Update existing offer
        await axios.put(`/api/specialOffers/${editingOffer._id}`, values);
        message.success("Offer updated successfully");
      } else {
        // Create new offer
        await axios.post("/api/specialOffers", values);
        message.success("New offer created successfully");
      }
      
      setIsModalVisible(false);
      fetchOffers();
    } catch (error) {
      console.error("Form submission error:", error);
      message.error("Failed to save offer");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleImageUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    
    const formData = new FormData();
    formData.append("file", file);
    
    setUploading(true);
    
    try {
      // Replace with your image upload API
      const res = await axios.post("/api/upload", formData);
      setImageUrl(res.data.url);
      onSuccess("Upload successful");
    } catch (error) {
      console.error("Upload error:", error);
      onError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text: number) => `${text}%`,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: SpecialOffer) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record._id, isActive)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SpecialOffer) => (
        <div className={styles.actionButtons}>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            type="primary"
            ghost
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this offer?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className={styles.specialOffersPage}>
        <div className={styles.headerSection}>
          <h1>Special Offers Management</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Create New Offer
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={offers}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={editingOffer ? "Edit Special Offer" : "Create Special Offer"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: "",
              subtitle: "",
              description: "",
              discountPercentage: 0,
              imageUrl: "",
              buttonText: "Shop Now",
              linkUrl: "",
              isActive: false,
              badgeText: "Limited Offer",
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter a title" }]}
            >
              <Input placeholder="E.g., Special Offer" />
            </Form.Item>

            <Form.Item
              name="subtitle"
              label="Subtitle"
              rules={[{ required: true, message: "Please enter a subtitle" }]}
            >
              <Input placeholder="E.g., 30% OFF on All Natural Vitamins" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter a description" }]}
            >
              <Input.TextArea
                placeholder="E.g., Boost your health with our premium quality supplements. Limited time offer!"
                rows={4}
              />
            </Form.Item>

            <div className={styles.formRow}>
              <Form.Item
                name="discountPercentage"
                label="Discount Percentage"
                rules={[{ required: true, message: "Please enter discount percentage" }]}
              >
                <InputNumber min={0} max={100} formatter={value => `${value}%`} />
              </Form.Item>

              <Form.Item
                name="buttonText"
                label="Button Text"
              >
                <Input placeholder="E.g., Shop Now" />
              </Form.Item>
            </div>

            <Form.Item
              name="linkUrl"
              label="Link URL"
              rules={[{ required: true, message: "Please enter a link URL" }]}
            >
              <Input placeholder="E.g., /shop" />
            </Form.Item>

            <Form.Item
              name="badgeText"
              label="Badge Text"
            >
              <Input placeholder="E.g., Limited Offer" />
            </Form.Item>

            <Form.Item
              name="imageUrl"
              label="Image"
              rules={[{ required: true, message: "Please upload an image or provide URL" }]}
            >
              <div className={styles.imageUploadSection}>
                <Input 
                  placeholder="Image URL" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Upload
                  customRequest={handleImageUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} loading={uploading}>
                    Upload Image
                  </Button>
                </Upload>
              </div>
            </Form.Item>

            {imageUrl && (
              <div className={styles.imagePreview}>
                <img src={imageUrl} alt="Preview" />
              </div>
            )}

            <Form.Item
              name="isActive"
              valuePropName="checked"
              label="Active Status"
            >
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default SpecialOffersPage; 