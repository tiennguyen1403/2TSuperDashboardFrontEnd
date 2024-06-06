import { Button, Col, Flex, Row } from "antd";
import { Add } from "iconsax-react";
import React, { useEffect, useState } from "react";
import useProjectStore from "src/store/useProjectStore";
import CommonModal from "./partials/CommonModal";
import { Project, ProjectDto } from "./Project.type";
import { initialValues } from "./constants";
import { ELoading, ModalType } from "src/helpers/constants";
import ProjectCard from "./partials/ProjectCard";
import { convertImagUrlToUploadItem } from "src/helpers/utilities";
import dayjs from "dayjs";
import _ from "lodash";
import useUsersStore from "src/store/useUsersStore";
import AddMemberDrawer from "./partials/AddMemberDrawer";

const Projects: React.FC = () => {
  const { fetchProjects, createProject, deleteProject, updateProject, loadingStates, projects } =
    useProjectStore();
  const { fetchUsers, loadingStates: userLoadingStates } = useUsersStore();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>();
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

  const openAddMemberDrawer = (project: Project) => {
    setIsOpenDrawer(true);
    setCurrentProject(project);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setCurrentProject(undefined);
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
      <AddMemberDrawer
        open={isOpenDrawer}
        project={currentProject}
        onClose={handleCloseDrawer}
        loading={userLoadingStates.includes(ELoading.FETCH)}
      />
    </>
  );
};

export default Projects;
