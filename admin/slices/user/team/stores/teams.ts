import { defineStore } from 'pinia';
import { TeamsService, TeamDto, CreateTeamDto } from '#api';
// import { useAuthStore } from '#auth';

export const teamCookieName = 'TEAM';

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as TeamDto[],
    team: {} as TeamDto,
    loading: false,
  }),
  getters: {
    getTeams: (state) => {
      return state.teams;
    },
    getTeam: (state) => {
      return state.team;
    },
    hasTeam: (state) => {
      return !!state.team?.id;
    },
    isLoading: (state) => state.loading,
  },
  actions: {
    reset() {
      this.teams = [] as TeamDto[];
      this.team = {} as TeamDto;
    },

    async init() {
      console.log('teams init start... hasTeam:', this.hasTeam);
      this.loading = true;
      // this.team = JSON.parse(Cookies.get(teamCookieName) || '{}');
      await this.fetchTeams();

      const route = useRoute();
      const idOrCodename = route.params.teamId as string;

      if (idOrCodename) {
        await this.fetchTeam(idOrCodename);
      }

      this.loading = false;
      console.log('teams init finished...');
    },

    async fetchTeams() {
      try {
        this.loading = true;
        const response = await TeamsService.getAdminTeams();
        console.log('response', response);
        if (response.data?.data) {
          console.log('fetchTeams...');
          this.teams = response.data.data;
          this.team = response.data.data[0];
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async fetchTeam(idOrCodename: string) {
      try {
        this.loading = true;
        const response = await TeamsService.getTeam({ path: { id: idOrCodename } });

        if (response.data?.data) {
          this.team = response.data.data;
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async createTeam(data: CreateTeamDto) {
      try {
        this.loading = true;
        const response = await TeamsService.createTeam({ body: data });
        console.log(response);
        if (response.data?.data) {
          await this.fetchTeams();
          this.team = response.data.data;
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
  },
});
