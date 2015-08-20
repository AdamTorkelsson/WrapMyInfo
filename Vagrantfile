# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    # Every Vagrant virtual environment requires a box to build off of.
    config.vm.box = "ubuntu/precise32"

    config.vm.provider "virtualbox" do |v|
            v.customize ["modifyvm", :id, "--memory", "1023"]
    end

    config.vm.synced_folder ".", "/home/vagrant/wrapmyinfo", :mount_options => ["dmode=777", "fmode=666"]

    config.vm.provision :shell, :path => "vagrant_bootstrap.sh"
    config.vm.network :forwarded_port, guest: 8081, host: 8081


end
