import React, { useEffect, useState } from "react";

//Type Import
import { Project, ProjectDto } from "./Project.type";
import { ELoading, ModalType } from "src/generalTypes";

//Hook Import
import useProjectStore from "src/store/useProjectStore";

//Component Import
import { Add } from "iconsax-react";
import { Button, Col, Flex, Row } from "antd";
import ProjectCard from "./partials/ProjectCard";
import CommonModal from "./partials/CommonModal";
import AddMemberDrawer from "./partials/AddMemberDrawer";

//Helper and Library Import
import _ from "lodash";
import dayjs from "dayjs";
import { convertImagUrlToUploadItem } from "src/helpers/utilities";

//Constants Import
import { initialValues } from "./constants";

const Projects: React.FC = () => {
  const { fetchProjects, createProject, deleteProject, updateProject, loadingStates, projects } =
    useProjectStore();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [projectDto, setProjectDto] = useState<ProjectDto>(initialValues);
  const [modalType, setModalType] = useState<ModalType>(ModalType.DEFAULT);

  const openCreateOrUpdateModal = (project?: Project) => {
    if (_.isEmpty(project)) {
      setIsOpenModal(true);
      setProjectDto(initialValues);
      setModalType(ModalType.CREATE);
    } else {
      const projectImage = convertImagUrlToUploadItem(project.projectImage);
      const projectCover = convertImagUrlToUploadItem(project.projectCover);
      const startDate = dayjs(project.startDate);
      const endDate = dayjs(project.endDate);
      const projectDto = { ...project, projectImage, projectCover, startDate, endDate };

      setIsOpenModal(true);
      setProjectDto(projectDto);
      setModalType(ModalType.UPDATE);
    }
  };

  const openAddMemberDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleCreateProject = async (projectDto: ProjectDto) => {
    try {
      await createProject(projectDto);
      closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleUpdateProject = async (updateProjectDto: ProjectDto) => {
    try {
      await updateProject(projectDto.id, updateProjectDto, projectDto);
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

  const generateModalInfo = () => {
    switch (modalType) {
      case ModalType.CREATE: {
        return {
          okText: "Create",
          title: "Create Project",
          onSubmit: handleCreateProject,
          loading: loadingStates.includes(ELoading.CREATE),
        };
      }
      case ModalType.UPDATE: {
        return {
          okText: "Update",
          title: "Update Project",
          onSubmit: handleUpdateProject,
          loading: loadingStates.includes(ELoading.UPDATE),
        };
      }
      default: {
        return {
          title: "",
          okText: "",
          loading: false,
          onSubmit: () => {},
        };
      }
    }
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
            <Button type="primary" onClick={() => openCreateOrUpdateModal()}>
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
                  openUpdateModal={openCreateOrUpdateModal}
                  openAddMemberDrawer={openAddMemberDrawer}
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
        title={generateModalInfo().title}
        okText={generateModalInfo().okText}
        loading={generateModalInfo().loading}
        onSubmit={generateModalInfo().onSubmit}
      />
      <AddMemberDrawer open={isOpenDrawer} onClose={handleCloseDrawer} />
    </>
  );
};

export default Projects;
