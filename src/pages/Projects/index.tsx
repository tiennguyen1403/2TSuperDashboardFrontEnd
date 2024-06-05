import { Button, Flex } from "antd";
import { Add } from "iconsax-react";
import React, { useEffect, useState } from "react";
import useProjectStore from "src/store/useProjectStore";
import CommonModal from "./partials/CommonModal";
import { ProjectDto } from "./Project.type";
import { initialValues } from "./constants";
import { ELoading, ModalType } from "src/helpers/constants";

const { CREATE, UPDATE } = ELoading;

const Projects: React.FC = () => {
  const { fetchProjects, projects, loadingStates } = useProjectStore();
  console.log("projects :>> ", projects);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [projectDto, setProjectDto] = useState<ProjectDto>(initialValues);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);

  useEffect(() => {
    fetchProjects();
  }, []); //eslint-disable-line

  return (
    <>
      <div className="projects">
        <div className="projects-header">
          <div className="projects-header-left">
            <p className="projects-header-title">Projects</p>
          </div>
          <div className="projects-header-right">
            <Button type="primary">
              <Flex>
                <Add size={20} />
                <span>Add Project</span>
              </Flex>
            </Button>
          </div>
        </div>
      </div>
      <CommonModal
        projectDto={projectDto}
        open={isOpenModal}
        modalType={modalType}
        onCancel={() => {}}
        onSubmit={() => {}}
        okText={modalType === ModalType.CREATE ? "Create" : "Update"}
        loading={loadingStates.includes(ModalType.CREATE ? CREATE : UPDATE)}
        title={modalType === ModalType.CREATE ? "Create Project" : "Update Project"}
      />
    </>
  );
};

export default Projects;
