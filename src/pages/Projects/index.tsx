import { Button, Col, Flex, Row } from "antd";
import { Add } from "iconsax-react";
import React, { useEffect, useState } from "react";
import useProjectStore from "src/store/useProjectStore";
import CommonModal from "./partials/CommonModal";
import { ProjectDto } from "./Project.type";
import { initialValues } from "./constants";
import { ELoading, ModalType } from "src/helpers/constants";
import ProjectCard from "./partials/ProjectCard";

const { CREATE, UPDATE } = ELoading;

const Projects: React.FC = () => {
  const { fetchProjects, createProject, deleteProject, loadingStates, projects } =
    useProjectStore();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [projectDto, setProjectDto] = useState<ProjectDto>(initialValues);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);

  const openCreateModal = () => {
    setIsOpenModal(true);
    setProjectDto(initialValues);
    setModalType(ModalType.CREATE);
  };

  const handleCreateProject = async (projectDto: ProjectDto) => {
    try {
      await createProject(projectDto);
      closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRemoveProject = (id: string) => deleteProject(id);

  const closeModal = () => {
    setIsOpenModal(false);
    setProjectDto(initialValues);
    setModalType(ModalType.DEFAULT);
  };

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
            <Button type="primary" onClick={openCreateModal}>
              <Flex>
                <Add size={20} />
                <span>Add Project</span>
              </Flex>
            </Button>
          </div>
        </div>
        <div className="projects-body">
          <Row gutter={[24, 24]}>
            {projects.map((project) => (
              <Col key={project.id} span={6}>
                <ProjectCard
                  key={project.id}
                  project={project}
                  onRemoveProject={handleRemoveProject}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <CommonModal
        open={isOpenModal}
        modalType={modalType}
        projectDto={projectDto}
        onCancel={closeModal}
        onSubmit={handleCreateProject}
        okText={modalType === ModalType.CREATE ? "Create" : "Update"}
        loading={loadingStates.includes(ModalType.CREATE ? CREATE : UPDATE)}
        title={modalType === ModalType.CREATE ? "Create Project" : "Update Project"}
      />
    </>
  );
};

export default Projects;
