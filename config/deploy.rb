# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'cropper'
set :repo_url, 'git@github.com:happyfreemo69/cropper.git'

set :branch, 'master'
set :scm, :git
set :format, :pretty
set :log_level, :debug
set :node_env, (fetch(:node_env) || fetch(:stage))

#set :linked_files, %w{jenkins-nginx/private/citylity.crt jenkins-nginx/private/citylity.key jenkins-nginx/private/citylity.ssl.conf jenkins-nginx/private/dhparam.pem jenkins-nginx/private/gandi-standardssl-2.chain.pem}
#set :linked_dirs, %w{jenkins-nginx/private}
# Default value for default_env is {}
set :default_env, { node_env: fetch(:node_env) }

set :keep_releases, 5
set :ssh_options, { :forward_agent => true, :port=>6543 }

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Install node modules non-globally'
  task :install do
    on roles(:app) do
        #nothing
    end
  end

  desc 'Start application'
  task :start do
    on roles(:app) do
      within current_path do
        #nothing
      end
    end
  end

  desc 'Stop application'
  task :stop do
    on roles(:app) do
      within current_path do
        #nothing
      end
    end
  end
  after :publishing, :start

  before :start, 'deploy:install'



end
