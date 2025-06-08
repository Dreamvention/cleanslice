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
      return !!state.teams.length;
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

      if (!this.hasTeam) {
        await this.fetchTeams();
      }
      this.loading = false;
      console.log('teams init finished...');
    },

    async fetchTeams() {
      try {
        this.loading = true;
        const response = await TeamsService.getTeams();

        if (response.data?.data) {
          this.teams = response.data.data;
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
