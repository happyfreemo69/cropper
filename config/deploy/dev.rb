set :deploy_to, '/home/deployer/cropper/'
set :user, 'deployer'
role :app, %w{deployer@185.8.50.133}
server '185.8.50.133', user: 'deployer', roles: %w{web}
