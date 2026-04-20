import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'challenge-workspace',
        pathMatch: 'full'
    },
    {
        path: 'challenge-workspace',
        loadChildren: () => 
            import('./features/challenge-workspace/challenge-workspace').then(m => m.challengeWorkspaceRoutes)
    }
];
