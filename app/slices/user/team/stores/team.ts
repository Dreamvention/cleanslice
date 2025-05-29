import { defineStore } from 'pinia';
import { TeamsService, TeamDto, CreateTeamDto } from '#api';
import Cookies from 'js-cookie';
// import { useAuthStore } from '#auth';

export const teamCookieName = 'TEAM';

export const useTeamStore = defineStore('team', {
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

      if (!this.hasTeam) {
        await this.fetchTeams();
      }
      this.loading = false;
      console.log('teams init finished...');
    },

    async fetchTeams() {
      try {
        const userStore = useAuthStore();
        const auth = userStore.getAuth;
        this.loading = true;
        const app = useNuxtApp();
        const response = await TeamsService.getTeams();

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

    async createTeam(data: CreateTeamDto) {
      try {
        this.loading = true;
        const app = useNuxtApp();
        const response = await TeamsService.createTeam({ body: data });
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
