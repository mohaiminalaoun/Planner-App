import React from "react";
import { action } from "@storybook/addon-actions";
import TaskModal from "../TaskModal";
import "../TaskModal.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
    title: "TaskModal",
    component: TaskModal
};


export const TaskModalStory = () => (
        <TaskModal
            show={true}
            onHide={()=>{}}
            tasks={[]}
            task={''}
            userName={''}
            onRichTextChange={()=>{}}
            currentModalTask={'This is the currentModalTask'}
            currentModalTaskEnd={''}
            didRichTextChange={false}
            richText={'Hello world'}
            closeFn={()=>{}}
        />
);
