import React from "react";
import { Table, Input, Form } from "antd";

const data = [];
for (let i = 0; i < 24; i++) {
  data.push({
    key: i.toString(),
    timing: `${i}-${i + 1}`,
    rowprice: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  state = {
    bgcolor: "cornsilk"
  };
  setColor = e => {
    if (e.target.value > 0) this.setState({ bgcolor: "green" });
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        <Form.Item style={{ margin: 0 }}>
          {getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `Please Input price!`
              }
            ],
            initialValue: record[dataIndex]
          })(<Input />)}
        </Form.Item>
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data };
    this.columns = [
      {
        title: "time",
        dataIndex: "timing",
        width: "15%",
        editable: true
      },
      {
        title: "Row Price",
        dataIndex: "rowprice",
        width: "10%",
        editable: true
      },
      {
        title: "Monday",
        dataIndex: "monday",
        width: "10%",
        editable: true
      },
      {
        title: "Tuesday",
        dataIndex: "tuesday",
        width: "10%",
        editable: true
      },
      {
        title: "Wednesday",
        dataIndex: "wednesday",
        width: "10%",
        editable: true
      },
      {
        title: "Thursday",
        dataIndex: "thursday",
        width: "10%",
        editable: true
      },
      {
        title: "Friday",
        dataIndex: "friday",
        width: "10%",
        editable: true
      },
      {
        title: "Saturday",
        dataIndex: "saturday",
        width: "10%",
        editable: true
      },
      {
        title: "Sunday",
        dataIndex: "sunday",
        width: "10%",
        editable: true
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        console.log(col);
        return col;
      } else {
        console.log(col);
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: "text",
            dataIndex: col.dataIndex,
            title: col.title
          })
        };
      }
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;
