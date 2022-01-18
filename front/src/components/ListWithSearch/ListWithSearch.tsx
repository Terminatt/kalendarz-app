import React from 'react';
import { List } from 'antd';
import CustomButton from '@components/CustomButton/CustomButton';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export interface ListWithSearchProps<T> {
    dataSource: T[];
    renderContent: (item: T, index: number) => React.ReactNode;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

const ListWithSearch = <T, >(props: ListWithSearchProps<T>): React.ReactElement => {
    const {
        dataSource, renderContent, onEdit, onDelete,
    } = props;
    return (
        <List
            itemLayout="vertical"
            dataSource={dataSource}
            renderItem={(item, index) => (
                <List.Item
                    actions={[
                        onEdit ? <CustomButton onClick={() => onEdit(item)} icon={<EditOutlined />} size="small" key="edit">Edytuj</CustomButton> : null,
                        onDelete ? <CustomButton onClick={() => onDelete(item)} icon={<DeleteOutlined />} size="small" variant="delete" key="delete">Usuń</CustomButton> : null,
                    ].filter((el) => !!el)}
                >
                    {renderContent(item, index)}
                </List.Item>
            )}

        />
    );
};

export default ListWithSearch;
