import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export default function FileUpload({ beforeUploadCallback }) {
  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        //@ts-ignore
        beforeUploadCallback(e?.target?.result);
      };
      reader.readAsText(file);

      return false;
    },
  };
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon ">
        <InboxOutlined style={{ fontSize: "28px" }} />
      </p>
      <p className="ant-upload-text w mt-4 text-sm uppercase tracking-normal">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
}
