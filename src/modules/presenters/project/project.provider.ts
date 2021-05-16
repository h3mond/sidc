// import { Provider } from '@nestjs/common';
// import { CreateProjectService } from '../../../core/services/project/create-project.service';
//
// export const createProjectSymbol = Symbol('createProject');
// export const createProjectProvider: Provider = {
//   provide: createProjectSymbol,
//   useFactory: (repository: ProjectRepository): CreateProjectService => {
//     return new CreateProjectService(repository);
//   },
//   inject: [ProjectRepository],
// };
