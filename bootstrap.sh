# Make It Pretty
git clone https://github.com/tpope/vim-vividchalk.git ~/.vim/

# Create .vimrc
curl -o ~/.vimrc https://gist.githubusercontent.com/unp/be8261aed5bf522f78d5/raw/136cfa043e5021ac5be6ee08ce8e61930751028f/.vimrc

# Install Vlundle
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim

# Install all the plugins
vim +PluginInstall +qall
